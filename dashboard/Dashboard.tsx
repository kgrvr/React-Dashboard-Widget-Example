import React, { useState, useCallback, useEffect } from 'react';
import GridLayout from 'react-grid-layout';

import { DashboardWidget } from './DashboardWidget';
import { WidgetSelector } from '../widget/WidgetSelector';

const defaultWidgets = [
  {
    id: 'IncrementWidget',
    layout: { i: 'IncrementWidget', x: 0, y: 0, w: 3, h: 1, isDraggable: false },
  },
  {
    id: 'DecrementWidget',
    layout: { i: 'DecrementWidget', x: 0, y: 1, w: 3, h: 1, isDraggable: false },
  }
];

export const Dashboard = () => {
  const [widgets, setWidgets] = useState(defaultWidgets);

  const onLayoutChange = useCallback(
		(_, oldItem, newItem) => {
			const newWidgetArr = [...widgets];
			newWidgetArr.forEach((x) => {
				if (x.id === oldItem.i) {
					x.layout = newItem;
				}
			});
			setWidgets(newWidgetArr);
		},
		[widgets]
	);

	const onDrop = useCallback(
		(_: Layout[], item: Layout, e: DragEvent) => {
			const raw = e.dataTransfer?.getData('droppableWidget');
			if (!raw) {
				return;
			}

			const droppableWidget = JSON.parse(raw) as IWidget<IWidgetDefaultProps>;

			const newWidgetArr = [...widgets];

			droppableWidget.layout.x = item.x;
			droppableWidget.layout.y = item.y;
			droppableWidget.layout.isDraggable = undefined;
			newWidgetArr.push(droppableWidget);

			setWidgets(newWidgetArr);
		},
		[widgets],
	);

	useEffect(() => {
		// Add any logic here to presist widgets and their layout to any presistent storage, like localStorage or any API
	}, [widgets]);

  return (
    <>
			<WidgetSelector />
      <GridLayout
				autoSize
				preventCollision
				useCSSTransforms
				isDroppable
				compactType={null}
        width={1000}
        onDrop={onDrop}
        onDragStop={onLayoutChange}
        onResizeStop={onLayoutChange}
      >
        {widgets.map(x => (
          <DashboardWidget key={x.id} widget={x} data-grid={x.layout} />
        ))}
      </GridLayout>
    </>
  );
};
