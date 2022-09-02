import { Link } from '@inertiajs/inertia-react'

export default function NewPage() {
    return (
        <>
            Pagina di prova.<br/>
            Link alla <Link href={route('new_page_two')}>seconda pagina</Link>.<br></br>
        </>
    );
}