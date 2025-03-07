import classNames from "classnames";
import { FC } from "react";

type MessageProps = {
  type: "delete" | "update" | "create"
}

const Message: FC<MessageProps> = ({ type }) => {

  let messageText = '';
  let colorClass = '';

  switch (type) {
    case 'delete':
      messageText = 'Book was successfuly deleted!';
      colorClass = 'is-danger';
      break;
    case 'update':
      messageText = 'Book was successfuly updated!';
      colorClass = 'is-warning';
      break;
    case 'create':
      messageText = 'Book was successfuly added!';
      colorClass = 'is-success';
      break;
    default:
      break;
  }


  return (
    <div className={classNames(
      "notification",
      "is-size-5",
      "pt-5",
      'is-light',
      "message",
      colorClass
    )}>
      {messageText}
    </div>
  );
};

export default Message;
