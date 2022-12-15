use yew::{function_component, html, Html, Properties};

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Account {
    pub id: String,
    pub name: String,
}

#[derive(Properties, PartialEq)]
pub struct Props {
    pub accounts: Vec<Account>,
}

#[function_component]
pub fn AccountList(props: &Props) -> Html {
    let accounts = props.accounts.clone();
    html! {
        <div>
            <h1>{"Accounts"}</h1>
            <ul>
                {for accounts.iter().map(|account| html! {
                    <li>{&account.name}</li>
                })}
            </ul>
        </div>
    }
}
