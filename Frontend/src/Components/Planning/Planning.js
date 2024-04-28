import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';


function Planning() {
    const { totalIncome, totalBalance } = useGlobalContext();

    // Function to calculate the budget allocations
    function calculateBudget(totalIncome) {
        const groceriesPercentage = 0.05;
        const stocksPercentage = 0.1;
        const clothingPercentage = 0.05;
        const subscriptionsPercentage = 0.05;
        const healthPercentage = 0.2;
        const tripsPercentage = 0.05;
        const othersPercentage = 0.1;

        // Calculate the amount allocated for each category
        const groceriesBudget = totalIncome * groceriesPercentage;
        const stocksBudget = (totalIncome-groceriesBudget) * stocksPercentage;
        const clothingBudget = (totalIncome-groceriesBudget-stocksBudget) * clothingPercentage;
        const subscriptionsBudget = (totalIncome-groceriesBudget-stocksBudget-clothingBudget) * subscriptionsPercentage;
        const healthBudget = (totalIncome-groceriesBudget-stocksBudget-clothingBudget-subscriptionsBudget) * healthPercentage;
        const tripsBudget = (totalIncome-groceriesBudget-stocksBudget-clothingBudget-subscriptionsBudget-healthBudget) * tripsPercentage;
        const othersBudget=(totalIncome-groceriesBudget-stocksBudget-clothingBudget-subscriptionsBudget-healthBudget-tripsBudget) * othersPercentage

        // Calculate the remaining amount for savings
        const remainingBudget = totalIncome - (groceriesBudget + stocksBudget + clothingBudget + subscriptionsBudget + healthBudget + tripsBudget +othersBudget);

        return {
            groceries: groceriesBudget,
            stocks: stocksBudget,
            clothing: clothingBudget,
            subscriptions: subscriptionsBudget,
            health: healthBudget,
            trips: tripsBudget,
            savings: remainingBudget,
            others: othersBudget
        };
    }

    // Call the function to get the budget allocations
    const budget = calculateBudget(totalIncome());

    function getResult(savings,balance) {
        if(balance >= savings) {
            return true;
        }
        else {
            return false;
        }
    }
    
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Planning</h1>
                <h2>Total Budget Planning: <span>${totalIncome()}</span></h2>
                <br />
                <div>
                    <h5>Groceries Limit: 0 - <span>${budget.groceries.toFixed(2)}</span></h5>
                    <br />
                    <h5>Stocks Limit: 0 - <span>${budget.stocks.toFixed(2)}</span></h5>
                    <br />
                    <h5>Clothing Limit: 0 -<span>${budget.clothing.toFixed(2)}</span></h5>
                    <br />
                    <h5>Subscriptions Limit: 0 - <span>${budget.subscriptions.toFixed(2)}</span></h5>
                    <br />
                    <h5>Health Limit: 0 - <span>${budget.health.toFixed(2)}</span></h5>
                    <br />
                    <h5>Trips Limit: 0 - <span>${budget.trips.toFixed(2)}</span></h5>
                    <br />
                    <h5>Others Limit: 0 - <span>${budget.others.toFixed(2)}</span></h5>
                    <br />
                    <h5>Savings Limit: Remaining amount for savings- <span>${budget.savings.toFixed(2)}</span></h5>
                    <br />
                    <h3 style={{ color: getResult(budget.savings.toFixed(2), totalBalance()) ? 'green' : 'red' }}>
                    <span>
                        {getResult(budget.savings.toFixed(2), totalBalance()) ? "Your Current Balance Meets the Savings Limit" : "Your Current Balance doesn't Meet the Savings Limit"}
                    </span>
                    </h3>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Planning