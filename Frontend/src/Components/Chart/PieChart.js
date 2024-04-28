import React from 'react';
import { Chart as ChartJs, Title, Tooltip, Legend, PieController, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(Title, Tooltip, Legend, PieController, ArcElement);

function PieChart() {
    const { incomes, expenses } = useGlobalContext();

    const incomeTotal = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            data: [incomeTotal, expenseTotal],
            backgroundColor: ['green', 'red'],
        }],
    };

    return (
        <ChartStyled>
            <Pie data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 35%;
`;

export default PieChart;
