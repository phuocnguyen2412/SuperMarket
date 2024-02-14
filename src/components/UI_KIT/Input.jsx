/* eslint-disable react/prop-types */
import clsx from "clsx";
export default function Input(props) {
    console.log(props);
    const { className, type = "text", placeholder, required, ...rest } = props;
    const classNames = clsx(
        {
            input: true,
        },
        className
    );
    console.log(required);
    return (
        <label className="label">
            {placeholder}
            {required && <span className="input-required">*</span>}
            <div>
                <input
                    className={classNames}
                    type={type}
                    placeholder={placeholder}
                    {...rest}
                    required={required}
                />
            </div>
        </label>
    );
}
