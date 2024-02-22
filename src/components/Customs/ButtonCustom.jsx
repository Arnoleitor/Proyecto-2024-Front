import { Button } from "antd";

export default function ButtonCustom({
    className = "mr2",
    text = "",
    children,
    onClick = ()=>{
        console.log( "ButtonCustom" );
    },
    ...props
}) {
    return (
        <Button
            className={className}
            type="primary"
            onClick={onClick}
            children={ children || text }
            {...props}
        />
    );
    
};


