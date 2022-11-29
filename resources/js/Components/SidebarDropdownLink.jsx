import { Link } from "@inertiajs/inertia-react"

const SidebarDropdownLink = ({ link, text }) => {
    return (
        <a href={route(link)} className="block py-2 px-4 hover:bg-gray-800 hover:text-white rounded">
            {text}
        </a>
    );
}

export default SidebarDropdownLink
