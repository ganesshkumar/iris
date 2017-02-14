import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks')
export const TaskOrder = new Mongo.Collection('tasksOrder');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $and: [
        { owner: this.userId },
        { active: true }
      ]
    })
  })

  Meteor.publish('tasksOrder', function taskOrderPublication() {
    return TaskOrder.find({
      owner: this.userId
    })
  })
}

Meteor.methods({
  'tasks.create'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      checked: false,
      active: true,
      username: Meteor.users.findOne(this.userId).username
    }, (error, result) => {
      if (!error) {
        const taskId = result
        // [TODO] Add check here
        if (!TaskOrder.findOne({owner: this.userId})) {
          TaskOrder.insert({
            owner: this.userId,
            tasksOrder: [],
            createdAt: new Date(),
          }, (error, result) => {
              TaskOrder.update({owner: this.userId},
                { $push: { tasksOrder: { $each: [taskId], $position: 0 }}},
                {upsert: true}
              )
          })
        } else {
          TaskOrder.update({owner: this.userId},
            { $push: { tasksOrder: { $each: [taskId], $position: 0 }}},
            {upsert: true}
          )
        }
      }
    })
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked }});
  },

  'tasks.delete'(taskId) {
    check(taskId, String);

    const userId = this.userId;
    const task = Tasks.findOne(taskId);
    if (task.owner !== userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { active: false }});
  },
  /*
  'tasks.update'(task) {
    // Todo: Add check here
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(task._id, task);
  },
  */
  'tasks.setOrder'(userId, taskIds) {
    check(userId, String)
    check(taskIds, [String])

    if (this.userId !== userId) {
      throw new Meteor.Error('not-authorized')
    }
    // [TODO] Add check here
    TaskOrder.update({owner: userId}, {$set: {tasksOrder: taskIds}}, {upsert: true});
  }
})
