import { useState } from "react"

const useInput = (initialState) => {    //Cunstom Hooks
    const [value, setvalue] = useState(initialState);
    const onChange = (e) => {
        const {
            target: { value }
        } = e;
        setvalue(value)
    };
    return { value, onChange }
}

export default useInput