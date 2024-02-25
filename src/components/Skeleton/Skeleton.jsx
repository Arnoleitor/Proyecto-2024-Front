import { Skeleton, Space } from 'antd';

const SkeletonComponent = () => {
    return (
        <>   
            <Space size={100} wrap>
                <div>
                    <Skeleton.Image active size={'large'} style={{width: '200px', height: '200px'}} />
                    <Skeleton active paragraph={{rows: 1}} />
                </div>
                <div>
                    <Skeleton.Image active size={'large'} style={{width: '200px', height: '200px'}} />
                    <Skeleton active paragraph={{rows: 1}} />
                </div>
                <div>
                    <Skeleton.Image active size={'large'} style={{width: '200px', height: '200px'}} />
                    <Skeleton active paragraph={{rows: 1}} />
                </div>
                <div>
                    <Skeleton.Image active size={'large'} style={{width: '200px', height: '200px'}} />
                    <Skeleton active paragraph={{rows: 1}} />
                </div>
            </Space>
        </>

    )
}

export default SkeletonComponent;