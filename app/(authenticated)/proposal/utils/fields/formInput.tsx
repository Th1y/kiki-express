type FormInputProps = {
    name: string;
    placeholder: string;
    span?: number; // how many columns does it take 
};

export function FormInput({
    name,
    placeholder,
    span = 1
}: FormInputProps) {
    return (
        <input
            name={name}
            placeholder={placeholder}
            className={`border p-2 rounded col-span-${span}`}
        />
    );
}