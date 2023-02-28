import React from 'react';
import PieClicks from './PieClicks';
import VerChart from './VerChart';
import VarChartWeekly from './VarChartWeekly';
import HamburgerMenu from './HamburgerMenu';

const Stats = () => {
    return (
        <div style={{minHeight:'37.5rem'}} className='grid place-items-center bg-neutral-300 absolute w-full'>
        <h1 className='text-4xl mt-10 text-center font-mono font-semibold text-slate-500'>Stats </h1>
        <HamburgerMenu/>
        <div className='mt-10 w-3/12'>
            <PieClicks/>
        </div>
        <div className=' mt-10 w-8/12'>
            <VerChart/>
        </div>
        <div className=' mt-10 mb-14 w-8/12'>
            <VarChartWeekly/>
        </div>
        </div>
    );
}

export default Stats;
