import { Link } from 'react-router';

export default function NotFound() {
    return (
        <>
            <h2>Page not found</h2>
            <Link to={'/'}>Back to Home</Link>
        </>
    );
}
