controladdin "CustomerTopFiveControl"
{
    RequestedHeight = 500;
    MinimumHeight = 500;
    MaximumHeight = 500;
    RequestedWidth = 900;
    MinimumWidth = 700;
    MaximumWidth = 900;
    VerticalStretch = true;
    VerticalShrink = true;
    HorizontalStretch = true;
    HorizontalShrink = true;
    Scripts = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
              'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
              'controlAddins/CustomerTopFiveAddin/Scripts/d3.min.js',
              'controlAddins/CustomerTopFiveAddin/Scripts/accounting.min.js',
              'controlAddins/CustomerTopFiveAddin/Scripts/moment.min.js';
    StyleSheets = 'controlAddins/CustomerTopFiveAddin/Css/style.css';

    StartupScript = 'controlAddins/CustomerTopFiveAddin/Scripts/startupScript.js';
    event ControlAddinReady();
    procedure GetCustomerTopFive(Customer: Text);
}