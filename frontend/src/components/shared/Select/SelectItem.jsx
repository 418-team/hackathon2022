function SelectItem({ item, handleChecked, type, field, filter, relation }) {
  const checked = filter
    ? relation.find((rel) => rel === item[field])
    : relation.find((rel) => rel[field] === item[field]);

  let label;
  if (field) {
    label = item[field];
  }
  if (type === "user") {
    label = `${item.first_name} ${item.last_name}${
      item.specialization ? `(${item?.specialization})` : ""
    }`;
  }
  if (!field && type === "user") {
    label = item;
  }

  return (
    <div
      className="select-item"
      onClick={(e) => {
        e.cancelBubble = true;
        handleChecked();
      }}
      aria-hidden="true"
    >
      {filter && <input type="checkbox" checked={checked} />}
      <div className="text">{label}</div>
    </div>
  );
}

export default SelectItem;
