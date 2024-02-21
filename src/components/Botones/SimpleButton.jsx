import { Button } from "antd";

export default function SimpleButton({
    className = "mr2",
    text = "",
    children,
    onClick = ()=>{
        console.log( "SimpleButton" );
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


