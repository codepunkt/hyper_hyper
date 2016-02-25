import React from 'react';
import { connect } from 'react-redux';
import Notes from './Notes';
import { createNote, updateNote, deleteNote } from './../actions/notes';

// todo: bindActionCreators
// see: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
@connect(state => state)
export default class App extends React.Component {
	render() {
		const notes = this.props.notes;

		return (
			<div>
				<button onClick={this.createNote}>+</button>
				<Notes
					notes={notes}
					onEdit={this.updateNote}
					onNoteClick={this.onNoteClick}
					onDelete={this.deleteNote} />
			</div>
		);
	}

	createNote = () => {
		this.props.dispatch(createNote({ task: '', editing: true }));
	}

	updateNote = (id, task) => {
		if (!task.trim()) {
			return;
		}

		this.props.dispatch(updateNote({ id, task, editing: false }));
	}

	deleteNote = (id) => {
		this.props.dispatch(deleteNote(id));
	}

	onNoteClick = (id) => {
		this.props.dispatch(updateNote({ id, editing: true }));
	}
}
