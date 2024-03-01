import React from "react";

export function HeaderPartial() {
    return <header className="nav-header">
	<div className="fx-grid">
		<div className="ms-Grid-row header-row">
			<div className="ms-Grid-col ms-xl8 header-left"> 
				<div className="menu">
					<a className="link" href='/'>首页</a>&nbsp;
					<a className="link" href='/'>文章</a> 
				</div>
			</div>
			<div className="ms-Grid-col ms-xl4 header-right">
				<div id="user-menu"></div>
			</div>
		</div>
	</div>
	<div className="ms-Grid-col ms-sm0 ms-xl2">
	</div>
</header>;
}