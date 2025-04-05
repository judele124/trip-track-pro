import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
const data = [1, 2, 3, 4, 5, 6, 7];

export function TestUI() {
	const [state, setState] = useState<number[]>(data.map((i) => i));

	return (
		<div>
			<DndContext
				onDragEnd={({ over, active }) => {
					if (!over) return;
					setState((prevItems) => {
						const oldIndex = prevItems.findIndex((e) => e === active.id);
						const newIndex = prevItems.findIndex((e) => e === over.id);

						return arrayMove(prevItems, oldIndex, newIndex);
					});
				}}
			>
				<SortableContext items={data}>
					{state.map((i) => (
						<Item key={i} i={i} />
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
}

const Item = ({ i }: { i: number }) => {
	const {
		setNodeRef,
		listeners,
		attributes,
		transform,
		transition,
		isDragging,
		isOver,
	} = useSortable({
		id: i,
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	if (isDragging || isOver) {
		console.table(attributes);
		console.table(transform);
		console.table(transition);
	}

	return (
		<div
			style={style}
			{...attributes}
			className='mb-2 w-[400px] bg-gray-400 py-2 text-center'
			{...listeners}
			ref={setNodeRef}
		>
			{i}
		</div>
	);
};
