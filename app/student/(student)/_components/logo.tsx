import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Image src="/logo1.png" alt="Instructor logo" width={80} height={50} />
            </Link>
        </div>
    )
}

export default Logo