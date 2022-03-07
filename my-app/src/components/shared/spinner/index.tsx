import { FC } from "react";

import "./styles.scss"; 

export const Spinner: FC = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}
