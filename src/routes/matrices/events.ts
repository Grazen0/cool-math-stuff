export interface MatrixItemEvent {
	move: {
		direction: 'left' | 'right';
	};
	delete: {};
}

export interface AnimationControlsEvent {
	next: {};
	previous: {};
}
