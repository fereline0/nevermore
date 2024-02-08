const classNames = require('classnames/bind');
import styles from "./page.module.css"

interface IDropdown
{
    getVisibility: boolean,
    children: React.ReactNode,
}

export default function Dropdown(props: IDropdown)
{
    const cx = classNames.bind(styles);

    const className = cx({
        dropdown: true,
        active: props.getVisibility,
    });

    return (
        <ul className={className}>
            {props.children}
        </ul>
    )
}