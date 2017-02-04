import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Tasks = new Mongo.Collection('tasks')


if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
//      $or: [
//        { owner: this.userId }
//      ]
    })
  })
}
