import { Tag } from '@chakra-ui/react';

type TickerSearchTagProps = {
  name: string;
  handleClick: () => void;
};

const TickerSearchTag: React.FC<TickerSearchTagProps> = ({ name, handleClick }) => {
  return <Tag onClick={handleClick}>{name}</Tag>;
};

export default TickerSearchTag;
