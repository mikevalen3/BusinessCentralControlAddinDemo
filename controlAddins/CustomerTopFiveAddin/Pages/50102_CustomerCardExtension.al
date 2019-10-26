pageextension 50102 CustomerControlExtension extends "Customer Card"
{
    layout
    {
        addafter(General)
        {
            group("Top 5 Items")
            {
                part(CustomerTopFive; "Customer Control Card Part")
                {
                    ApplicationArea = All;
                    SubPageLink = "No." = field("No.");
                    Caption = ' ';
                }
            }
        }
    }
}