import React from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import DraggableBox from "./DraggableBox";
import { snapToGrid } from "./snapToGrid";
import update from "immutability-helper";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  position: "relative",
};
class Container extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      boxes: {
        a: { top: 0, left: 0, src: this.props.img },
      },
    };
  }
  render() {
    const { connectDropTarget } = this.props;
    const { boxes } = this.state;
    return connectDropTarget(
      <div style={styles}>
        {Object.keys(boxes).map((key) => this.renderBox(boxes[key], key))}
      </div>
    );
  }
  moveBox(id, left, top) {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      })
    );
  }
  renderBox(item, key) {
    return <DraggableBox img={this.props.img} key={key} id={key} {...item} />;
  }
}
export default DropTarget(
  ItemTypes.BOX,
  {
    drop(props, monitor, component) {
      if (!component) {
        return;
      }
      const delta = monitor.getDifferenceFromInitialOffset();
      const item = monitor.getItem();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      if (props.snapToGrid) {
        [left, top] = snapToGrid(left, top);
      }
      component.moveBox(item.id, left, top);
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(Container);
