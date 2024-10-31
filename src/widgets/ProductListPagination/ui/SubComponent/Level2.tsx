import { Flex, Pagination } from "antd";

interface ILevel2Props {
    readonly pageSize: number;
    readonly total: number;
    readonly current: number;
    readonly onChange: (page: number) => void;
}


// Второй уровень карты (пагинация)
const Level2: React.FC<ILevel2Props> = (props) => {
  const { total,current,onChange,pageSize } = props;
  
  const onChangePage = (page: number) => {
    onChange(page);
  };

  return (
    <Flex justify="center" align="center" style={{ width: "100%" }}>
      <Pagination 
        align="center"
        pageSize={pageSize}
        total={total}
        current={current} 
        defaultPageSize={pageSize}
        defaultCurrent={1}
        onChange={onChangePage}
      />
    </Flex>
  );
};

export default Level2;
