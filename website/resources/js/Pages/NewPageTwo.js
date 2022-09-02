import { Link, usePage } from '@inertiajs/inertia-react'

export default function NewPageTwo() {
    const { url } = usePage();
    return (
        <span>
            Seconda pagina di prova.<br/>
            Link alla <Link href={route('new_page_three')}>seconda pagina ma con altro URL</Link>
             <Link href={ route('new_page') }>mentre qui manda indietro</Link>.
        </span>
    );
}