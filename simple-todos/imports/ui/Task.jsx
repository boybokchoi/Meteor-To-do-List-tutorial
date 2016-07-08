import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked(){
  	//set the checked property to the opposite of its current value
  	//Tasks.update(this.props.task._id, {
  	//	$set: {checked: !this.props.task.checked },
  		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask(){
  	//Tasks.remove(this.props.task._id);
  	Meteor.call('tasks.remove', this.props.task._id);
  }


  render() {
  	//give tasks a different classname when they are checked off,
  	//so that we can style them nicely in CSS

  	const taskClassName = this.props.task.checked  ? 'checked' : '';

    return (
      <li classname={taskClassName}>
      	<button className="delete" onClick={this.deleteThisTask.bind(this)}>
      		&times;
      	</button>

      	<input 
      		type = "checkbox"
      		readOnly
      		checked={this.props.task.checked}
      		onClick={this.toggleChecked.bind(this)}
      	/>

      	<span className="text">
      		<strong>{this.props.task.username}</strong>: {this.props.task.text}
      	</span>
      </li>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};