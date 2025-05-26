"use client";
import FuzzyText from '@/components/ui/fuzzytext';
import Link from 'next/link';
export default function Custom404() {
    return (
    <div className='flex flex-col items-center justify-center h-[70vh]'>
        <Link href="/"><FuzzyText 
        baseIntensity={0.2} 
        hoverIntensity={1} 
        enableHover={true}
        >
        404
        </FuzzyText></Link>
        
    </div>)
}