import React from 'react';
import Note from './Note';

export default ({notes, onEdit, onDelete, onNoteClick}) => {
	return (
		<ul>{notes.map(note =>
			<li key={note.id}>
				<Note
					editing={note.editing}
					task={note.task}
					onEdit={onEdit.bind(null, note.id)}
					onDelete={onDelete.bind(null, note.id)}
					onNoteClick={onNoteClick.bind(null, note.id)} />
			</li>
		)}</ul>
	);
}
