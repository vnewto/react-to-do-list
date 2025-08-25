export default function TextInputWithLabel ( {elementId, onChange, ref, value, labelText} ) {
    return (
        // create fragment that contains a label and an input
        <>
            <label htmlFor={elementId}>{labelText}</label>
            <input
                id={elementId}
                ref={ref}
                value={value}
                onChange={onChange}>
            </input>
        </>
    )
}