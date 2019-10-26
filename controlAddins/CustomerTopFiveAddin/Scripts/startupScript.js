let ControlAddIn = document.getElementById("controlAddIn");
if (typeof(ControlAddIn) != undefined){
    let bcDiv = document.createElement("div");
    bcDiv.id = "bcDiv";
    bcDiv.className = "container";    
    ControlAddIn.appendChild(bcDiv);
    window.GetCustomerTopFive = function(salesHistory) {
        let itemSales = salesByItem(salesHistory);
        let documentSales = salesByDocument(salesHistory);
        let customerTopFiveItems = document.createElement("div");
        customerTopFiveItems.innerHTML += "<h2>Top Five Items Ordered</h2>";
        let customerTopFiveItemSalesList = document.createElement("ul");
        customerTopFiveItemSalesList.id = "customerTopFiveItemSalesList";
        customerTopFiveItemSalesList.className = "customerTopFiveItemsList";
        for (let index = 0; index < 5; index++) {
            const item = itemSales[index];
            let listItem = document.createElement("li");
            listItem.innerHTML += "<h3>" + item.key + "</h3>" +
            "<h3 style='margin-bottom:3px;'>Total Sold</h3>" +
            "<h3 style='margin-bottom:3px;'>" + item.value.totalQuantity + "</h3>" +
            "<p><strong>Last Ordered</strong></p>" +
            "<p style='margin-bottom:3px;'>" + moment(item.value.lastOrderDate).format('MM/DD/YYYY') + "</p>" +
            "<p><strong>Total Sales</strong></p>" + 
            "<p>" + accounting.formatMoney(item.value.totalAmount) + "</p>";
            customerTopFiveItemSalesList.appendChild(listItem);   
        }
        customerTopFiveItems.appendChild(customerTopFiveItemSalesList);
        bcDiv.appendChild(customerTopFiveItems);        
        let customerTopFiveDocuments = document.createElement("div");
        customerTopFiveDocuments.innerHTML += "<h2>Top Five Orders</h2>";
        let customerTopFiveItemDocumentsList = document.createElement("ul");
        customerTopFiveItemDocumentsList.id = "customerTopFiveItemDocumentsList";
        customerTopFiveItemDocumentsList.className = "customerTopFiveItemsList";
        for (let index = 0; index < 5; index++) {
            const item = documentSales[index];
            let listItem = document.createElement("li");
            listItem.innerHTML += "<h3>" + item.key + "</h3>" +
            "<h3 style='margin-bottom:3px;'>Total Amount</h3>" +
            "<h3 style='margin-bottom:3px;'>" + accounting.formatMoney(item.value.totalAmount) + "</h3>" +
            "<p><strong>Order Date</strong></p>" +
            "<p style='margin-bottom:3px;'>" + moment(item.value.lastOrderDate).format('MM/DD/YYYY') + "</p>" +
            "<p><strong>Line Items</strong></p>" + 
            "<p>" + item.value.totalLines + "</p>";
            customerTopFiveItemDocumentsList.appendChild(listItem);   
        }
        customerTopFiveDocuments.appendChild(customerTopFiveItemDocumentsList);
        bcDiv.appendChild(customerTopFiveDocuments);
    }
}
function salesByItem(salesHistory){
    let customerSalesHistory = JSON.parse(salesHistory);
    let result = d3.nest()
        .key(function(d) { return d.itemNumber})
        .rollup(function(v) { return {
            totalItemOrders: v.length,
            totalQuantity: (d3.sum(v, function(d) { return d.quantity; })),
            lastOrderDate: d3.max(v, function(d) { return d.postingDate; }),
            totalAmount: +(d3.sum(v, function(d) { return d.lineAmount; })).toFixed(2),
            averageAmount: +(d3.mean(v, function(d) { return d.lineAmount; })).toFixed(2) }; })                                           
        .entries(customerSalesHistory)
        .sort(function(a, b){ return d3.descending(a.value.totalQuantity, b.value.totalQuantity); })
    return result;    
}
function salesByDocument(salesHistory){
    let customerSalesHistory = JSON.parse(salesHistory);
    let result = d3.nest()
        .key(function(d) { return d.documentNumber}).sortKeys(d3.descending)
        .rollup(function(v) { return {
            totalLines: v.length,
            lastOrderDate: d3.max(v, function(d) { return d.postingDate; }),
            totalAmount: +(d3.sum(v, function(d) { return d.lineAmount; })).toFixed(2),
            averageAmount: +(d3.mean(v, function(d) { return d.lineAmount; })).toFixed(2) }; })                             
        .entries(customerSalesHistory)
        .sort(function(a, b){ return d3.descending(a.value.totalAmount, b.value.totalAmount); });
    return result;  
}

Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('ControlAddInReady', null);