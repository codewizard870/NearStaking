import React, { FunctionComponent } from 'react';

import ActionItem from './ActionItem';

interface Props {
  item: any
}
const HistoryItem: FunctionComponent<Props> = ({ item }) => {
  const actions = item.actions;
  const receiverId = item.receiverId;
  const signerId = item.signerId;
  const blockTimestamp = item.blockTimestamp;
  const blockHash = item.blockHash;
  return (
    <>
      {actions.map((action: any, index: number) => (
        <ActionItem
          action={action}
          receiverId={receiverId}
          signerId={signerId}
          blockTimestamp={blockTimestamp}
          blockHash={blockHash}
          key={index} 
        />
      ))}
    </>
  );
}
export default HistoryItem;
