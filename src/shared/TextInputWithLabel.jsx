export default function TextInputWithLabel ( {elementID, onChange, ref, value, label} ) {
    return (
        // create fragment that contains a label and an input
        <>
            <label htmlFor={elementID}>{label}</label>
            <input
                type="text"
                id={elementID}
                ref={ref}
                value={value}
                onChange={onChange}>
            </input>
        </>
    )
}