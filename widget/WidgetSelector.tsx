import React from 'react';

const availableWidgets = [
  {
    previewImg: 'https://via.placeholder.com/200x80',
    previewName: 'Placeholder Image',
    id: 'ImageWidget',
    layout: { i: 'ImageWidget', x: 0, y: 0, w: 3, h: 1 },
  }
];

export const WidgetSelector = () => {
  return (
    <div style={{ borderBottom: '1px solid' }}>
      <div>Drag and drop a widget from following list:</div>
      {availableWidgets.map(widget => (
        <div
          key={widget.id}
          unselectable="on"
          onDragStart={e => {
            // this is a hack for firefox
            // Firefox requires some kind of initialization
            // which we can do by adding this attribute
            // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
            e.dataTransfer.setData('text/plain', '');
            e.dataTransfer.setData('droppableWidget', JSON.stringify(widget));
            return true;
          }}
        >
          <img src={widget.previewImg} />
          <div>{widget.previewName}</div>
        </div>
      ))}
    </div>
  );
};
