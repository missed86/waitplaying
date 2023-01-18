import './SearchBar.css'

// https://heroicons.com/
// https://www.systemuicons.com/
const SEARCH_ICON = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
// const SEARCH_ICON2 = <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5"/><path d="m17.571 17.5-5.571-5.5"/></g></svg>


export default function SearchBar() {
  return(
    <div className="search-bar">
        <input type="text" placeholder="Search"></input>
        <span className="input-icon">{SEARCH_ICON}</span>
      </div>
  )  
}