page 50101 "Customer Control Card Part"
{
    PageType = CardPart;
    Caption = ' ';
    SourceTable = Customer;
    layout
    {
        area(Content)
        {
            usercontrol(Ctrl; CustomerTopFiveControl)
            {
                ApplicationArea = All;

                trigger ControlAddinReady()
                begin
                    isAddinReady := true;
                    GetCustomerTopFive("No.");
                end;
            }
        }
    }
    procedure GetCustomerTopFive(CustomerNo: Text)
    var
        CustomerSalesHeader: Record "Sales Invoice Header";
        CustomerSalesLines: Record "Sales Invoice Line";
        CustomerJsonObjectLines: JsonObject;
        CustomerJsonArray: JsonArray;
        CustomerJsonArrayLines: JsonArray;
        CustomerJsonText: Text;
    begin

        CustomerSalesHeader.Reset();
        CustomerSalesHeader.SetFilter("Sell-to Customer No.", CustomerNo);
        if CustomerSalesHeader.FindSet(false, false) then begin
            repeat

                CustomerSalesLines.Reset();
                CustomerSalesLines.SetFilter("Document No.", CustomerSalesHeader."No.");
                CustomerSalesLines.SetFilter("Sell-to Customer No.", CustomerSalesHeader."Sell-to Customer No.");
                CustomerSalesLines.SetFilter(Quantity, '>%1', 0);
                CustomerSalesLines.SetRange("Posting Date", CustomerSalesHeader."Posting Date");
                if CustomerSalesLines.FindSet(false, false) then
                    Clear(CustomerJsonArrayLines);
                repeat
                    Clear(CustomerJsonObjectLines);
                    CustomerJsonObjectLines.Add('documentNumber', '');
                    CustomerJsonObjectLines.Add('postingDate', '');
                    CustomerJsonObjectLines.Add('itemNumber', '');
                    CustomerJsonObjectLines.Add('quantity', '');
                    CustomerJsonObjectLines.Add('lineAmount', '');
                    CustomerJsonObjectLines.Replace('documentNumber', CustomerSalesLines."Document No.");
                    CustomerJsonObjectLines.Replace('postingDate', CustomerSalesLines."Posting Date");
                    CustomerJsonObjectLines.Replace('itemNumber', CustomerSalesLines."No.");
                    CustomerJsonObjectLines.Replace('quantity', CustomerSalesLines.Quantity);
                    CustomerJsonObjectLines.Replace('lineAmount', CustomerSalesLines."Line Amount");
                    CustomerJsonArray.Add(CustomerJsonObjectLines);
                until CustomerSalesLines.Next() = 0;
            until CustomerSalesHeader.Next() = 0;

            CustomerJsonArray.WriteTo(CustomerJsonText);
            CurrPage.Ctrl.GetCustomerTopFive(CustomerJsonText);
        end;
    end;

    var
        isAddinReady: Boolean;
}