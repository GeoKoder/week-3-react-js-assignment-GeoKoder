export default function Card ({ title, children, className = "" }) {
    return (
        <div className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow rounded p-4 ${className}`}>
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            <div>{children}</div>
        </div>
    )
}