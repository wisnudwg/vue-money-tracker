const r = {
  summary: { income: 500_000, expense: 200_000, total: 300_000 },
  daily: ['Tue 27 Feb 2024', 'Wed 28 Feb 2024', 'Thu 29 Feb 2024', 'Fri 01 Mar 2024'].reverse().map((ds, idx) => ({
    datestring: ds,
    entries: [
      { id: (idx+1)*10+1, operation: 'transfer', amount: 200_000, source: 'BCA', target: 'CIMB Niaga', category: '', note: '', timestamp: new Date(`${ds} 11:00:25`).getTime(), datestring: ds, timestring: '11:00:25' },
      { id: (idx+1)*10+2, operation: 'expense', amount: 100_000, source: 'BCA', target: '', category: 'Household', note: '', timestamp: new Date(`${ds} 12:34:12`).getTime(), datestring: ds, timestring: '12:34:12' },
      { id: (idx+1)*10+3, operation: 'income', amount: 150_000, source: 'Salary', target: 'BCA', category: '', note: 'Company X', timestamp: new Date(`${ds} 17:00:00`).getTime(), datestring: ds, timestring: '17:00:00' },
    ],
  }))
}

console.log(r)