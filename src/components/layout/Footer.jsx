export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white text-center text-sm p-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} MySite. All rights reserved</p>
      <div className="mt-2 space-x-4">
        <a href="#" className="text-blue-500 hover:underline">
          Privacy
        </a>
        <a href="#" className="text-blue-500 hover:underline">
          Terms
        </a>
      </div>
    </footer>
  );
}
