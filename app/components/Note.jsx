import React from 'react';

export default class Note extends React.Component {
	render() {
		return this.props.editing ? this.renderEdit() : this.renderNote();
	}

	renderEdit = () => {
		console.log(this.props);
		return <input type="text"
			// todo: what is this shit?
			ref={(e) => e ? e.selectionStart = this.props.task.length : null}
			autoFocus={true}
			defaultValue={this.props.task}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	}

	renderNote = () => {
		const onDelete = this.props.onDelete;

		return (
			<div onClick={this.props.onNoteClick}>
				<span>{this.props.task}</span>
				{onDelete ? this.renderDelete() : null}
			</div>
		);
	}

	renderDelete = () => {
		return <button onClick={this.props.onDelete}>x</button>;
	}

	checkEnter = (e) => {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	}

	finishEdit = (e) => {
		const value = e.target.value;

		if (this.props.onEdit && value.trim()) {
			this.props.onEdit(value);
		}
	}
}
