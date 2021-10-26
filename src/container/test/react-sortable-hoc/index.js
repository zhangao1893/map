import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => (
  <li style={{ border: '1px solid #000', width: '100px', margin: '10px' }}>{value + '哈哈哈'}</li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value} />
      ))}
    </ul>
  );
});

export default function index() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const arr = items.slice();
    arr.splice(oldIndex, 1);
    arr.splice(newIndex, 0, items[oldIndex]);
    setItems(arr);
  };
  return <SortableList items={items} onSortEnd={onSortEnd} />;
}
