const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Schema for tasks matching this json object format:
// {
//     "_id": "642e3662fc13ae490678cb3a"
//     "task_name": "call maintenance",
//     "description": "clean properly this time",
//     "room": "Ilaka", // Should be a room id when PUT/POST
//     "assignee": "badbunny", or ID OF USER FOR POST AND ID FOR PUT/POST
//     "due_time": 164707834700,
//     "complete": true,
//     "repeat": 1
// }

const TaskSchema = new Schema({
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    room: { // have to populate these three
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'house'
    },
    due_time: { // MongoDB date type
        type: Number,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    repeat: {
        type: Number,
        required: true
    },
});

// Add Cascading remove to delete all references to tasks when a task is deleted
TaskSchema.pre('remove', function (next) {
    // Remove all the assignment docs that reference the removed task
    this.model('user').updateMany({
        _id: this.assignee // Task may not be assigned to anyone
    }, {
        $pull: {
            assigned_tasks: this._id
        }
    });

    this.model('room').updateMany({
        _id: this.room
    }, { // Task may not be assigned to any room
        $pull: {
            tasks: this._id
        }
    });

    this.model('house').updateMany({
        _id: this.house
    }, { // Filter by house id
        $pull: {
            tasks: this._id
        }
    });

    next();
});

// If a task is created not updated, add it to the room, user, and house it is assigned to
TaskSchema.post('create', function (next) {
    if (this.assignee != null) {
        this.model('user').updateOne({
            _id: this.assignee
        }, {
            $push: {
                assigned_tasks: this._id
            }
        });
    }
    if (this.room != null) {
        this.model('room').updateOne({
            _id: this.room
        }, {
            $push: {
                tasks: this._id
            }
        });
    }

    this.model('house').updateOne({
        _id: this.house
    }, {
        $push: {
            tasks: this._id
        }
    });

    next();
});

// If we update a task, we need to update the room, user, and house it is assigned to
TaskSchema.post('update', function (next) {

    // Check if there is a change in assignee
    if (this._update.assignee != null && this._update.assignee != this._conditions.assignee) {
        // Remove the task from the old assignee
        this.model('user').updateOne({
            _id: this._conditions.assignee
        }, {
            $pull: {
                assigned_tasks: this._conditions._id
            }
        });

        // Add the task to the new assignee
        this.model('user').updateOne({
            _id: this._update.assignee
        }, {
            $push: {
                assigned_tasks: this._conditions._id
            }
        });
    }

    // Check if there is a change in room
    if (this._update.room != null && this._update.room != this._conditions.room) {
        // Remove the task from the old room
        this.model('room').updateOne({
            _id: this._conditions.room
        }, {
            $pull: {
                tasks: this._conditions._id
            }
        });

        // Add the task to the new room
        this.model('room').updateOne({
            _id: this._update.room
        }, {
            $push: {
                tasks: this._conditions._id
            }
        });
    }

    // NO CHANGE IN HOUSE ALLOWED FOR TASKS
    next();
});

module.exports = Task = mongoose.model('task', TaskSchema);