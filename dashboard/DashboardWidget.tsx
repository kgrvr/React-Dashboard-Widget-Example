import React, { forwardRef, Suspense, useState } from 'react';
import { Layout } from 'react-grid-layout';

const loadWidget = widget => {
  // Due to StackBlitz limitaion, I was not able to make it work dynamically
  // But this switch case can be easily replaced with following dynamic code
  // return React.lazy(() => import(`../widget/${widget.id}.tsx`));
  switch (widget.id) {
    case 'IncrementWidget':
      return () => import(`../widget/IncrementWidget.tsx`);
    case 'DecrementWidget':
      return () => import(`../widget/DecrementWidget.tsx`);
    case 'ImageWidget':
      return () => import(`../widget/ImageWidget.tsx`);
    default:
      return null;
  }
};

export const DashboardWidget = forwardRef((props, ref) => {
  const { widget } = props;
  const [WidgetComponent] = useState(React.lazy(loadWidget(widget)));

  return (
    <div ref={ref} {...props}>
      <Suspense fallback={<>Loading</>}>
        <WidgetComponent />
        {props.children}
      </Suspense>
    </div>
  );
});
