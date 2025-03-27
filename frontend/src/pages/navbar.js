import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../App.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEREhMTExMWFRMWGBUbGBgYGBcfIRoVHRUbHRkYGhofHyggHR8lHxoYITEhJSktLi4xGh8zODMsNygtMC0BCgoKDg0OGxAQGy8lHSUuLy8wLy0vLS0uLy0uNi4tLS0tLS0tLS4tLS4uLy0uLS4tLS0tLS0tLS0tLS4tLy41L//AABEIAJYBLAMBEQACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAABAUGBwIDCAH/xABLEAABAwIBBggJCgMJAAMBAAABAAIDBBEFBhIhMUFRBxMiYXFygZEUMjRzobGys9EjM0JSVGKCkqLBFRaTFzVDU4PC0uHwY+LxJP/EABoBAAIDAQEAAAAAAAAAAAAAAAAEAgMFAQb/xAA3EQACAgEBBQUFBwQDAQAAAAAAAQIDBBEFEiExURMyQXHwIjOBkbEUFSNhocHRNFJT4QZC8ZL/2gAMAwEAAhEDEQA/ALxQAIAEARfKnKcUlRRRXFppCJNWhls0Hm5Tgb/cKZpo7SEpdCqdm60iUJYtBAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAjeXuPGhpTKy3GF7GsuNZvdw/I1yYxae1no+RXbPdjqP1JUNlYyRhu17Wuad7XC4PcqHFptMmnrxNy4dBAAgAQAIAEAc+8JOK+EV8xBu2M8U3oZ43685b2HXuVL8+IhdLeky58jsW8Lo4JibuLbP67eS7vIv2rHyK+zscRyuW9FMe1STBAAgAQAIAEACABAEKyn4RqWkJZH8vKNBDTyWn7z/ANhdOU4U7OL4Ipnco8EV5iXCXiMvivbC3cxo9p1z3LQhg1R5rUXlfJjfHlFiT+UauYfjd6grHTSuG6gUpvjqPGH5cYnD/jNmH1ZGj2hY+lUyxaZeGhNTmvHUnGTPCPTVLhHMPB5tVnHkuPM7Z295SN2FOHGPFFsLk+D4MnCTLgQAIAEACABAAgAQAIAEACABAAgAQAIAprhoxXPqIqcHRE3Od137D0NAP4lr7Or0g59RTIlq9CWcEmLcfRcUTd8Di3nzDymH1t/Clc+vds3upbRLWOnQnKSLgQAIAEACAGvKbFBS0s8+1jCW9c6GDtcQFZTX2liiRnLdi2c1OcSbnSTrXpDOLS4E8V+fpSd0rPQ1/wDs9Ky9o18p/AZx5c4lrrLGgQBX3C3i9RTR05gldGXOeDm7dAsn8CuE3LeWpRfJxS0IHgOV1e+pp2OqZC10sQIJ1gvAIT1uNUoNqPgURsk2uJfqwh4EACAKg4R8vHPc6lpX2jFxJI3W87WtP1RqJ29GvWw8RJb8+Ypdbr7MStFpC5sp2AuaDquuS4I7Fasd1SXggBNXRXbfaPUpRejITWq1Jvwb5dujc2lqXXjNhHI4+IdjHH6uwHZ0akszETW/DmTqt04MuFZI2V7wuYvUUzKcwSujLnSB2addg210/gVwm5by1KL5OKWhW3854j9ql71pfZaf7RbtJdTdBl7ibDoqXHrNYfWFF4lL/wCp3tp9SZZLcKmc5sdY1rb6BKzQB12/uO5J3bP0WtfyLoX+Ei0GuBAINwdR5lmDJROU2VlfHWVLGVMgY2aUNAOoB5sFuU49Tri3HwEZ2SUmtSYcEWNVNS6p4+V0maIs3OOq+ff1BKZ9UIKO6tC6iTlrqWSs4YG3KKZzKWpe0lrmwylpGsERkghTqSlZFPqiMuEWUN/OeI/ape9b32Wn+0R7SXUubg7rZJ8PhkleXyO4y7jrNpXAegBY2XCMbWorgOVNuKbJKlyw1yyhrS5xs1oJJ3ADSUJa8AOaMdxI1NRNOb/KPJAOxv0W9gsOxelqhuQUehnSlq2yT8EuLcTXCMnkTtLDuzxymH0Fv4krnV71WvQsolpLQvRYg6CABAAgAQBWPDViubHDTNOl5Mj+q3Q3sJJP4FpbOr4ubFsiXBIqNawqPOR+K+CVkExNmhwD+o7ku7gb9ipyK+0rcSdct2SZ0ivOmgCAKx4cPmqXryey1aWze9IWyOSK1ya8spfPw+8atK73cvJi8O8jphebNEEAQrhRyiNJS8XGbSz3a0jW1n03dOkAda+xOYVPaT1fJFN091aIopbgkCAM4n5rgdxXGtUCej1HcG+kaiqRg9QBqqXWY7ot3rseZGXIaVcUl6cFuUbqumMchJlgzWkn6TDfMcTv0EHq32rDzaeznquTHaZ7y0fgM3Dh83S9eT1NV2zuciGRyRVdBSumljiaQHSPawE6rucAL961JS3YuT8BZLV6Ewr+C6vjaXN4qWwvmscb9gc0ApSOfU3o+Ba6JIhJBGgp0pLs4IcXdNSOiebugdmjzbhdg7OUOgBYmfWo2by8RyiWsdOhVOV/l1Z5+b3hWrj+6j5IWs7zJ3wG+NV9EPrkSW0uUfiXY/iWwsoaGvKjyKr8xN7tysp95HzRGfdZzSvSGcX7wWf3ZT9MvvnrBzffP4fQep7iJalS0h/Clivg9BI0Gz5iIx0HS/8ASHDtCbwq9+1PpxKrpaRKFW6Im2lqHRPZIw2cxwc07nNNwVyUVJNME9OJ01hda2eGOZviyMa4c1xe3YvNTi4ScX4GlF6rUVqJ0EACABAHO2X+K+FV07wbsacxnVZouOYm7u1egxa9ypIQtlrJsxyaybdVxVkgv8hFnNttfe+bz8lr+2yLr1XKK6s5CG8m+gwJggdD5A4t4VQwPJu9ozH9Zmi55yLO/EvPZVfZ2tD9Ut6KZI1QWFY8OHzVL15PZatLZvekLZHJFa5NeWUvn4feNWld7uXkxeHeR0wvNmiCAKB4UMU4/EJRfkxWjb+Hxv1Fy3cKvdqX58RG6WsiJpsqBAAgDdBUuZzjcVFxTJRk0Kf4gPqnvUdwl2glnnL9egDUFNLQhKTY4YBk9U1r8yCMu3uOhres79tartuhUtZM7GDlyLIosUpsHfT0MREkr5WeEyfVzuTbmto0bADtKzpVzyFKyXBJcBhSVekUY8OHzdL15PU1GzucgyOSK3yY8spfPw+8atK73cvJi8O8jpdebNE5syulY+tqnR2LDLIQRqPK0kdJuV6KhNVRT6GdZxk9CxOBCncIqqT6LnxtHS0OJ9sLP2lLjFDGOuDZXeV/l1Z5+b3hWhj+6j5Ios7zJ3wG+NV9EPrkSW0uUfiXY/iWwsoaGvKjyKr8xN7tysp95HzRGfdZzSvSGcX7wWf3ZT9MvvnrBzffP4fQep7iJalS0pThkxXjKtkAPJgbp677E/pzPStnZ9elbl1E8iWstCO5FYEK6rZCbhlnueRrDQ3X+bNHamMm3sq3IrrjvS0GepgdG9zHCzmOLXDcQbEK6LUlqiDWnAuTgcxXjaR8BPKgfo6j7uH6s/0LH2hXu2KXUcx5ax0LBSBeCABADJljivglHPMDZwaQzru5LT2E37Fdj19pYokLJbsWznBeiM8vvgwwnwegjJHKmvI7od4n6Q09pWFmWb9r/LgPUx0iU3lZhXglXPDbktcS3qO5TPQQtiiztK1IUnHdk0TbgUxXNkmpidDwJGdZuh3aQW/lSO0a9Upl2PLi0W6soaKx4cPmqXryey1aWze9IWyOSK1ya8spfPw+8atK73cvJi8O8jphebNEEAc45XYNUwTyOmYbSPe4SDS1+c4m7XftrXoaLITglHwM+yLT4jGryAIAEAKqLDZ5jaKKSQ/da4+pRlOMe89Dqi3yJVhXBliE1i9rYW73u0/lbf02Ss86qPLiWxok+ZIW5LYPh3KrKgTSD6F9vm23P5jZL/aMi7hWtET7OuHeY25QcJRLOJoY/B4xozrAOt91o5LPSehWVYPHeterIyu4aR4EeyUyXnr3l9zHC03kmdqG02J1u/8AFMX5EalpzfQhCtyJrwzytfBRua4Oa4vIcNoLWkFJbOWkpJl2RxSKuo6l0UjJGGzmOa5ui/KabjR2LUlFSTTFU9HqP+JZd4jOwsfOQ0ixDGtbcbrgX7EvDEpi9Uix2yfiMNDTiSRjC9sYcQC92po3lXylupvTUglqzo7JvCoqWmjihOcwC+d9cnSX35/gvO22Ssm5SNCEVFaIoHK/y6s8/N7wrex/dR8kI2d5ibDcXqKbO4iV8edbOzSRe17X7ypzqhPvLUipOPIW/wA34h9rm/OVD7NV/aiXaS6mE+VNc9rmuqpXNcCCC82IIsQULHqT13UHaSfiM6uIF+8Fn92U/TL756wc33z+H0Hqe4iTVdQ2Jj5HmzWNc5x3NaLkpWMW2kixvRanM2KVrp5pZneNI9zjzXN7L00IqMVFeBnSer1LT4FcJzYpqlw0vOYzqN0uI5iSB+BZe0bNZKC8BnHjwbItws4TxFcZALMnaHjdn6njvGd+JNYNm9Vp0K746S1NXBbivg9expNmTAxnpOlnbnADtXc2vfqb6cTlMtJF9rCHgQAIAqrhsxX5ilB3yv8AS1n+/wBC1NnV85/AVyJckV1gGHeE1MMOoPeATubrcexoJWhbPcg5FEY7zSOko5Y2gNDmgAAAAjQF5xpviaHAqzhpw5pMFUwg/wCE+xHO5mj8/cFqbOm+MH5i2RHlIgeTGKeC1UE+xjxndQ6Hj8pKeur7StxKIS3ZJnSrXA6RqXnDRKz4cPmqXryey1aWze9IWyOSK1ya8spfPw+8atK73cvJi8O8jphebNEEAURg+W89E+SB7GzU+e+8T7aOWb5pto32IIW5ZixtSkuEhKNrjw8B8jyjwCbTLR8W7baMW/Qf2VDpyo92WpPfqfNG4Ytk23VDf/TkPrK52eY/EN6noeHLjBofmaG538VE303JR9kyJd6f6sO1rXJCOu4W5rWgp44xsLiXW7BmhTjs6P8A2epx5D8ERjE8rsRqWkvmk4u9jmclvRdtr9qvhTj1zUOG908fkQcrJR3uOnXwI8SmiosbCMi6Knhiq6+pbmPa17Ymm17i+bfxndDbdKzrMqycnCqIxGuKW9JmFdjlRirm0NBFxNKNBA0ci/jSEaGt+6NfOuxqhQu0tesjjk5+zHkL+F6m4qloIr3zM5t7WvmsYL27FXgS3pzfUletIpFaUNK6aWOJts6RzWC+rOcbC/etKUlFOT8BdLV6Eyn4K8QaLjiX8zXm/wCpoCUW0Kn1Lfs8iIYlh01PIY5mOY8bDu3jeOdNQnGa1i9SpxaejJrwV5VPhmbSyOvDKbMv9CQ6rczjotvIO+6edjqUd9c0XU2aPdZF8r/Lqzz83vCmcf3UfJFdneYoyVyUnxEyCF0beLzb55cPGva1gfqlcvyI06b3iEK3PkSD+yWu/wAyn/M//gl/vCroyz7PI0V/BhWQxSSukgLY2OebOfezW3NuRzKUc+uTUUnxOOiSWpB06Ul+8Fn92U/TL756wc33z+H0Hqe4hLwtYrxFCYweXO4M58wcp59Ab+JTwK963XocvlpHQo5jSSANJJsOlbfISOkcnaSOlpoYA5vIYAbEaX63ntcSe1ectk5zcupoxSikiMcLdAyejErS0vgdnaxfMdocB+k/hTOBNws0fiVXrWOpS0MrmODmmzmkEHcRqK2WtVoxM6YwPEW1NPDO3VIxrrbiRym9huOxebthuTcX4GjGW8kxeoEgQBzfllivhdZPMDdpdZnUbyW94F+1eix6+zrUTPslvSbGVXEAQAIAEAdA8G+K+E0EJJu6P5N3Szxf05p7VgZle5a/z4j1MtYojXDh81S9eT2WpnZvekV5HJFa5NeWUvn4feNWld7uXkxeHeR0wvNmiCAOc8u6AwV9SzYZHPHVfyh7Vuxehxp71UWZ9i0kxhV5AEAOuH5Pzy2ObmN+s/dzN1rHzNu4eM3HXel0j+75GjjbKyL+Om6ur/gkdBkzBHpdeV33tX5fivLZn/Isu/2a3uL8uf8A9fxob2PsXHq4z9p/ny+Qmy0kzYo2DQC+9hua3/tNf8Xr3smy181H6v8A0Ubdko0wgvF/RESjjc4hrQSTqAFyexe3b04s8uTbJvg2rKktdNeCL73jEbms2dtu1JXZ1cOEeLLoUylz4EjrMXpqTi8Nwz52V7WPmablpJsTnfSfa/M31LRrnZrddyXgWOSj7EDzhtbaKkG50nstXdnd6QZHJFcZMeWUvn4feNWjd7uXkxeHeR0uvNmiV5wz0THUkcpAz2SAA/dcDdvoB7E/s6TVjj4FGQvZ1Kcp5ixzXt0FpBHSDcLYa1WjE1wHTLDy6r8/N7ZVWP7qPkiVneZOuA3xqvoh9ciS2lyj8S/H8S2FlDQ15UeRVfmJvduVlPvI+aIz7rOaV6Qzi/eCz+7Kfpl989YOb75/D6D1PcRXXC7ivHVvFA8mBob+N3KefZH4Vo4Fe7XvdRe+WstOhB06UggAQAIAuPgYxXPp5acnTE7Ob1H7B0ODj+ILH2jXpNT6jePLVaFjrPGCO5e4t4LQzvBs9zcxnWfouOcC7vwq/Fr37Uiu2W7Fs53XoRAtHAuCyOanilkme18jA4tAbYZ2kDTzWWXZtBxm4xXIZjQmtWxf/ZDT/aJfysUfvGf9pL7Ouof2Q0/2iX8rEfeM/wC0Ps66lbZWYIaKqkguXBuaWuI8ZpFwf27FoUW9rBSFpx3XoTDgXxXMnlpydErc5vXZrA6Wkn8ISm0a9YKfQux5cdB14cPmqXryey1VbN70iWRyRV+DVLYqiCR181kkbnW12a8E27lp2RcoNIWi9GmXH/arh+6b8jf+SyPu+38vXwG/tETdRcJdDNJHE0TZ0jmsF2NtdxsL8rRrUZYNsYuT04HVfFvQY+GHBDJm1LByo2WeN8Wd434XOF+Z/MpbPyUrHQ/Far9/2DIpbh2i8Ho/2KmW0JAgCX4FlGZHNilbyzqc3b1hs6V4ja3/AB+OPCV9EvYXOL8PJ+PlzPUbO2u7ZKq1e0/FfuiRrzBvETyumbx8AcC5jRdzQbXBdpF9mhq9r/xatrHtn4uWnyX+zy+3p63Qj0Wvzf8AomLeEXDaZtqSjINvqsZ3uFyVqfYrpv8AEkZfbQj3URrE8scSxJ3ERAtD9AihB0j7ztdt+oJmGNTQt6X6lTsnPgid5B8H7aMtnnOfUW5IHix3Fj1nWJF9WntSOVmOz2Y8i+und4vmNvDh83S9eT1NVmzuciORyRWOC1LYqiCR181ksbnW12a8E27lp2RcoOK8RaL0aZb0vCxQAaGTuPVYP96yFs+3qhv7REgGXGWsmIlrAzi4WG4be5c7VnOPRew5yn8bFVPHXVlFlrmM2TWGmpqoIQL57235mA3eexoKuunuVuRCEdZJGzK/y6r8/N7wrmP7qPkgn3mTvgN8ar6IfXIktpco/Evx/EthZQ0NeVHkVX5ib3blZT7yPmiM+6zmlekM4vTg+rGwYPHK7xY2zuPQ2V5WHlRcshxXjoO1PSvUpGsqXSyPkebue5zndLjcrbjFRSSEm9XqTrIng8bW03HyyvjznODA0DS1ujO0/ezh2JDJzXVPdS1L66d5askH9kNP9ol/KxU/eM/7Sz7Ouof2Q0/2iX8rEfeM/wC0Ps66kIy9yUGHSxta9z45GkhzgAc4HlN0cxb3pzFyO2Tb5ootr3GHBrivg1fFc2bL8k78Xi/rDUZle/U/y4hTLSR0CsEfKi4asWzpIaVp0MBkf1naGA84Fz+Nauzq9E5sUyJcUiD5K4X4VVwQbHvGd1Byn/pBT19nZ1uRTCO9JI6UAsvOGieoAEAVXw2YXogqgNV4nelzP9/eFp7Os5w+IrkR5MrjAcSNNUQzj/DeCbbW/Sb2i47VpWw34OPUojLRplk8NMrXw0jmkFrnPLSNrS1tiFm7OWkpDGRyRU61RUEAOeS/ltJ5+H3jVVd7uXkyUO8i/wDKGmLo89rQ8szs5h0h8bhZ7CNtx6l5HKU4pW196PH+TbxXBt1WcpfXwKNyqwAQPz4bvgeTm7XMP1Hj1O2r0Gz9q0ZcOEkpeKfAz8vAux5aNarqM9LQTSmzI3HssO0lM5GdjY63rbEvjq/kimnFuuekINkywDBBTjOdypSNJGpo+q3b2rw22NsSzXuQWla+bfV/svA9Xs7ZscZb8uM3+nkLv4hFxvEhwMlibDZbYTv5uZZ/2G/7N9pcdIapa+fivy/Mb+10u7sVL2hpfkzU4jVTcSG5sQY1znmwBzb22k6yvZ7FshjbPr3v+28/1/0eX2onblz08NF+hIsN4IwOVU1PJGsRjZ13fBOT2jrwhETWP1ZIMKqqKnd4LhkbJZj47xpawfWll22+qDzaEvONk1v3PReuSLIuK9mBM2AgC5ubaTvKTLis+HA/J0vWk9TVp7N5yFsjkipFqioIAVYdhs1Q4MhjdI7c0E9+5RnOMFrJ6HVFvkXVweZF+ANMstnVDxY21MZ9UHadVzzC3Pi5eV2r0jyHKqt3i+ZUWV/l1X5+b3hWvj+6j5IVs7zJ1wG+NV9EPrkSO0uUfiXY/iWysoaGrKnyKr8xN7pysp95HzRGfdZzUvSGcWBX4rxWA0sIPKnfLfzbJ3Od+rMHaUhGveypS6fwXuWlSRA4IXPc1jRdziABvJNgE82ktWUczpjBsPbTQRQt1Rsa2+8gaXdpue1easm5zcn4mlFaLQXKJ0EAQnhZwrj6F0gF3wODx1fFeOixzvwpzBs3bdOpTfHWOpRjXEEEaCNS3BI6UyZxQVdLDOCLvaM62x40PHY6683dX2c3E0YS3o6iuaghec50THOOslrSe8hRU5Lgmd0R7DQxMN2Rsad7WtB9AXHOT5sNEKVw6CABAGqaBrxZ7Q4biAR3FGrXIBP/AAqn/wAmL8jfgpdpLqc3V0M5qCJ4a18bHBvihzWkDRsB1LinJcUw0TNX8Gpfs8P9NnwUu1n1fzObsegfwal+zw/02fBHaz6v5hux6AzCaYEEQRAg3BEbLg7xoQ7JvxYbq6C9QJEfxPJiKQlzCY3HXYXBPQszI2ZVa9Y8GaWPtKytbsuKI/jGTVVEwuiaJyPoB2abc19BS9WxN6WkrFFeWoxPbCS9mGvxKzxnGau5je0wb22Id2k6V6bC2Bh06Tf4j/Pl8uXz1MfK2vk2+yvZX5c/mMtPM6NzXt0OaQR0862L6Y31yqnyktPX7GbVZKuanHmuI84RlNWwySmneWumN3Na0OudmaCCqYYVMKoVaezFaInO+c7JT8XxJThuSOK4iQ6smkji12kJuR92LUO2ypnkUU8K1q/XiSjXOfeLQwHA4KKIRQMzRrJ1lx3uO0rMttlZLWQzGKitEOirJCeqo4pbcZGx9tWc0G3RddUnHkzjSfM0fwal+zw/02fBS7WfV/M5ux6B/BqX7PD/AE2fBHaz6sN2PQVxRNYLNaGjcBZQbb5kjYgBDJhNO4lzoIi4m5JjYSTvJspKya4Jkd1dDbS0UUV+LjYy+vNa0X3XsFxylLmzqSXIUrh0wkYHAggEEWIOojcUAI/4NS/Z4f6bPgp9rPqyO6uhn/DYLBvFR5rb2GY2wubmwtoXN+XPU7ogZhsAIIhjBGkEMbcHpshzk/ENELFE6CABAGD2AgggEEWIO0bkAJf4VT/5MX5G/BS7SXU5uroKIYGMGaxoaNzQAO4LjbfM7yI9i+NVMcrmRxhzRaxzHHW0HWCsfKzL67XGEdV5M1cXDosqUpy0fmhvflTVAgFjATqBa74pZ7TyE9HFfJjS2ZjtaqT+aMzlHWf5Q/I/4qX3hlf2foyP3fi/3fqiYtOgLdXIwnzMl0AQAIAEACABACTE5C2GRzTZzWOIPOAqMiTjVKS5pMtoipWxi+TaEOS9XJLCXSOznZxF9Gqw3JfZ9s7at6b1eoxtCqFVu7BaLQeU+JAgBPV0UUotJGyQbntDvWuxnKPJ6HGk+Y2fylh97+CQ/wBNvqtZW/abf7mR7OPQcaPD4Yfmoo4+o1rfUq5TlLvPUkklyFSidBAAgAQAlxF5bFI5ughjyDzhpsqr5ONcpLmkyymKlZFPk2huyWrZJonOkdnHPIvYDRmt3dKU2ddO2pym9Xr/AANbRphVaowWi0/ke1oCIIAEACABAAgAQBE8rq2eORgY5zWW0Fu119I59mhYu0rroTioPRfubOzaaZwk5LV/sSSic4xsLxZ5a3OH3raVrVOTgnLnoZNqiptR5aihWEAQAIAEACABAAgCI5S+WU/+n7wrDz/6uv4fU28D+ls+P0JctwxBPVVTIxd7g0c59W9VWWwrWs3oTrqnY9IrUQDKSlvbjP0u+CW+8cfXTe/RjX3dkaa7v6ocaedjxnMcHDeCm4TjNaxeqFJwlB6SWjNymRMHvAFyQANpXG0lqwSbeiGybKGlabcaD0Bx9IFknLaGPF6bw5HAyJLXdFFHisEpsyQE7tR7irasqm3hCRVbi21cZRPcZ+Ym82/2SjK9xPyYYvvoeaGzIw//AM567vU1KbK9w/P+Bvanv15CufKCmYbGQE8wJ9IFlfPPx4vRyKIYGRJaqIspKyOUXjeHDm2dI2K+u6Fi1g9SiymdT0mtAmrY2PDHPAe61gdZubBErq4yUG+LCNM5Rc0uCPKuuiiF5HhvT8NaLbq6l7b0Cqmy16QWokgx+mebCQA84I9JFlRDPom9FIvngZEFq4jqnBQ1veACSQANZKi2orVgk29ENkmUVK024y/QHH9kpLaGOnpvDkdn5DWu6LKPEIpfm3h3Rr7tavqvrt7j1KLaLKu+tAxX5ibzcnslcyfcz8n9DuN76HmvqNORHzDvOO9lqS2T7l+f7Id2r75eX7seaqrjiF3uDRzn1J+y6Fa1m9BCuqdj0gtRvblJSk24z9LvglltHHb03v0Yy9nZCWu79Bzgma8ZzSHA7QbpuE4zWsXqhSUJQeklozapkRLWV8UWmR4b06+7Wqbb66u+9C2qiy3uLURxZRUrjbjAOkOHpIsqI7Qx5PTeL5bPyIrXdF8tSxjc9zgG6NOzTqTMrIxjvN8BWNcpS3UuJpkxKANa4yNDXXzTfXbXZVyyaUlJyWj5Fkce1txUXqhamCkbqzGIIjZ8gvuFyfRqS1uXTU9JS4jFWJdYtYx4GNNjtNIbNkF+e49ajXnUTeikSswr4LVxHNNiomq6yOIZ0jg0c+3oCqtuhWtZvQsqpnY9ILUTUmNU8pzWyDO2A3F+i+tVVZtNj3Yy4ltuHdWt6UeA5JoWBAERym8sp+iP3hWHn/1dfw+pt4H9LZ8foSTEKtsMbpHamjvOwLXuuVVbnLwMimp2zUF4kVw7DZK1xmmcQy9gBt5m7gN6xKMeeZJ22vh65fkbN+RDEiqqlx9cx7OTNLa2YRz5zr+uy0fu3H000/ViC2lka66/ohiqqWXD5GyMcXRONiDt+67n3HpWfZVZgzU4PWLNCu2vOg4TWkkS+Coa9jXg8ki9+bnW3CyM4qa5MxJ1yhJwfNETmklxCUsYc2Fvq3neTsCxJSszrXGL0gjajGvBqUpLWbHmDJmmaLFpcd5cf2sE/DZtEVo1qIT2lfJ8HoIsRyVYRnQktcNQJ0Ht1hUX7Li1rVwZfRtSaelvFHtFUTupJxM0gtY8Bx1uGadfRvXa52yxZq1ck+PU5bCqOVB1Pm1w6DNhAlnaKZhzWXLnu5tH/rLPxe0uj2EeC5tmhk9nTLt5cXyRJosmqYNsWFx3lxv6CFrx2bjpaNamTLaOQ3qnoMWIUxoJmSRkmN2sHd9Jp/b/AKWddW8K6M4P2X60NCm1ZtThPvL1qZ5U1AZVQyDTmsY4c9nuIXdo2bmRCfRJ/qzmz697HnB+La/RCrDcEM/y9SS4v0hurRsv8Ffj4Lu/FverfgU35qp/Co4aeIpxDJeFzTxbcx9tBubE7je6tu2bVKPsLRlNO0rYy9t6o1ZIV7nMfE/XHqv9Xd2fuo7MvcouuX/UntOhRkrIf9vqN9TNLXzFjDaJvda/jHeTsH/aUsnZnW7kOEF61Gq4V4VW/LjJ+tP5HmHJemAsQ5x3lxHqT8dmY8Vo1qIy2ne3qnoNOL4A6n+Wgc7k6SNoG8HaOZJ5OBKj8Wl8hzGz1f8AhXLmOlNiXhFJK7U8MeHDnzDp7fim4ZPb4s2+aT1+QnPG7DKilybWnzEGTta2CkkkOm0jrDe7NbYJbBvVOLKb6/shnOpd2VGC6fuxPhuFyVjjNM4hp1W28zdwVWPizy32tr4ev0Lb8qGIuyqXEen5L0pFg0g7w43+HoWg9mY+mmn6iC2lkJ66/oMUsc2HShwJdE70jcdzuf8A7Wc42YNiaesX6+ZoKVefW01pJevkSDF8YbFAJG6S+2Z2i9z0fBaeVmKqlTjzfIzMbEdlrhLw5jPhOAOn+Wnc7laQL6SN5OwcyQxsB3/i3PmP5OcqfwqVyHWXJemIsGlp3hx/fQnZbMx2tEtPiJx2lkJ6t6kcxWKalY+BxzopLFp3EOB0bucc6y8iNuNF0vjF8jUx5VZMlcuElzPMS8mo/wDV9oLmR/T0/E7R/UXfD6D7lRijmWhj+cfrtrAOgAc5WhtDKlDSqvvMztn4sZ62z7qMMNyVjABmu5x1i9gO7SVyjZcEtbeLO37Um3pXwRtrclYHA5l43bNJI7QVO3ZdUl7HBkatqWxft8UJMna+SOU0s2seKTs0XtfaCNIVODfOux49vw9fQtzqIWVrIq+Pr6muSn8LrXseTmRg6OYWFu83UJQ+1ZkozfCJONn2bEjKK4sW4jktE9vyXybxq0kg9KYv2ZXJfh8GL0bTsi/xOKHukhLGNaXFxAtnHWedaFcHCKi3rp4iFklObklpr4I3qwgRHKbyyn6I/eFYef8A1dfw+pt4H9LZ8fob8uJSI427C4nuH/as2vJqEY9WVbJjrOUuiE1HlC+NjWNpjZoA1nTo1+L2qqraE64KCr5euhbbgQsm5uzn66m/+aZfsx7z/wAVZ952f4/XyIfdlf8Ak9fMSYljr5o3RmnIzttzoOsHxVVfmztrcHXz9dC2jBhTYpqzl66mdJUPZh0gIIIJaLjY4i/tFdrnKOBJPy+f/pGyEZZ0WvP5f+DvknAG0zDtcST32HoATuzYKOOn1Etozcr2ug9LQEQQAixn5ibzb/ZKXyvcT8mX4vvoeaGjIiICJ7tpfbsAFvWUjsiKVUpdWO7Wk3ZGPREkWsZZHMuG/INP/wAg9lyy9rL8Fef7M1Nkv8Zr8v4GnFWZ8tG0/SigB7XFIZMd+2lPxjEdx5blVrXhKROF6M88eoAgRkLJq631ZB3ytH7rzbk4WX6dH9Uej3d+qnXqvox/yPpw2nDtr3EnsNgPR6VpbLrUaN7qZm05uV+70/8AR+WkZ5i4XRzAhGGt4uStiHi8XN+nV6CV56hdnO6tct2X6HoL32kKbHz1j+o3OefB42DUZXntzWAespNyfYRgvGT/AGG0l20pdIr9yxKeEMa1g1NAA7F6qEFCKiuSPLTm5ycn4m5TIjXlHTh9PID9EZw6W6UpnVqdEtfDj8hrBscL46ePD5kLo5OOdTwu8Vrrdjn3K8/XLtpV1Pkv3Z6CyPZRssXN/sixwF6s8qeoAZMr4Q6mcTraWkd+b6is/aUFLHb6D+zJuN6XUjeJeTUf+p7QWVke4p+Jq0f1F3w+hnU1pbWySZmeWuIA6OSCiy5xzJT3ddH/AKOV0qWJGGumq/2Of81S/Zj3n/inPvSz/H6+Qp92V/5PXzPP5ql+zHvP/FH3pZ/j9fIPuyv/ACevmNOI18ks0cohcxzc3eb2NxsSd187bY2bmjQ5RRCqqVe/qmOuO0UsM3hMOn6w3aLG42gpvMptqt+0VfH10E8O6u2r7Pb8PXUccHygjns08iT6p29UpvFz4XcHwYrlYFlPtLih6T4iCAIjlN5ZT9EfvCsPP/q6/h9TbwP6Wz4/QV5a05dE14+g7T0HR67d6u2tW3UpLwf1KNlWJWuL8V9B2wqqEsTHg3JAv1tvpT+NaraoyQjkVOq2UWLVeUiPEa5kDC9+q4GjWSdg/wDbFTffGmG/ItoondPdiI8WLaikeY9ILbjR9U31dhCXydL8ZuHn8hjG1oyUp+tRPkfVh8OZ9JhPcTcH1jsVWy7VKnc8UWbTqcbd/wAGSBaZnAgBvxSVrqeYtIIzH6Qb/RKWyZKVE2n4MYx4uN8E14oQZFeTnru9TUrsn3D8/wCBravv15D+tMzSPZb+Tt8432XLM2r7lef8mnsr3z8v4Gqq+fofN0/tJG339HlD6jlfub/OX0JsvQmACAIM2nMlRWtGklklhvIkaQPQvPdm7L7oro/qj0DsVdFMn1X0Y7ZGVYdEY/pMJ0fdOm/fdObKtUqtzxQltSpxt3/BkjWqZhrmkDGlzjYAEk8wUZSUU2+SOxi5NRXNkLwcGQ1k9rAxy97rn0WWBjJ2dtb+T/U38lqvsavzX6CAwE0rZB9GV4Pa1hHq9KVcG8ZTXhJ/RDO+lkOD8Yr6sn1BVCWNjxqcO47R3r01NqtrU14nmrqnVY4PwFKtKxnypqxHTvG1/JA6dfoukdoWqFDXi+A7s+pzvT8FxIp4KadlNPY6TnHsddve1YrrdEartPX+0bPaq+VlOvr/ANJ/DKHtDmm4IuDzL00ZqSUlyZ5qUXGTi+aNikcI7lnVhsPF35TyNH3Qb377LL2pao1bnizT2XU5W7/ghixLyaj/ANT2gs7I9xT8TRo/qLvh9Bxjd4PiDs7Q2S+nrafaFkzF9hnvXlL9/wDYrJdvgrTnH9v9EuW4YoIAbpMXibMISTnm2zRc6h07Uq8quNvZN8RiOLZKrtUuA4poXItlVhDAwzxjMc0gm2i+m1+lY+0MSCi7YcGjW2dlyclVPimPWC1JlgjedZGnnINifQtDEsdlMZPmIZdUa7pRXIXpgoIllI0msg0HVH7wrEzk/tVfw+ptYLSxZ/H6EnqIGvaWuF2uBBHMticFOLjLkzHhNwkpLmiI5tRh73WGfCT2f/UrC0vwZPRaw9fJm5rRnRWr0n6+aFTssWW0RG/WFle9rx04R4lC2RLXjLgJIqaor3h0l2RDmto+7vPP/wDipjXdmzUrOEV64F0rKcKDjXxk/XEmMUYaA0CwAAA3ALdjFRSS5GHKTk23zIrieEy08nHU17bWjZvFtreZYuRiW0WdrRy6evA2cfLrvr7K/wCfrxM4crwND4iHbbH9jqUo7XWmk48SMtkt8YS4Gipx6oqfk4Iy2+gkaT36mqE867I9iqOnr9CyvBpx/bulr6/UcKbCfB6WYE3e5js617eKbAfFMwxewxprxaYtPK7fJg1yTRnkYLQG+jlu9TV3ZS0oevUjtR63LToP60zOI9lqCYG2F/lB7LlmbVWtK06/yaWynpc/L+BrqWnj6HQdEdPs+8krF+PR5R+o5W12N3nImq9AYIIAimCNPh9QbG1pPbasbET+2WPz+psZbX2OteX0Zji2FywS8fT3tpJaNm/RtbzKOTi2U2dtR6/0dxsqu6vsb/X+z2LLCw5cRzuY/HUiO1+HtQ4hLZOr9mXASz1lTXnMYzNjvp3fid+wVU7r817kFpH1zZbCmjCW/N6y9ckP7qFsFLJG3TaN9ztJzTcrTdEacaUI9H9DMV8rsmM5dV9RvyVpRJSyMeNDnuH6W6Urs6pTxpQkuDf8DW0bHDIjOL4pfyIQanD3EAZ8RPYef7p1Jb8fBk0lrD18mM/gZsU3wl6+YqfliLaIjfndo9Sue11pwhx8ylbIevGXDyE9LQT1sgknBbGNQ1XG5o/dV10W5dm/bwj65Fll9WJX2dXGXrmSeuoWSxmNw5J1W2biNy2LqI21uEuRkU3Sqnvx5kZY2soiQ0cZF0Ej4tWMllYb0S3o+vka7eLmLVvSXr5mwZTVD9EcHK6HH0Kz7yvnwhDj8SP3bRDjOfAS4lhUghknqHXlObmi+rlDXs1X0Km/GmqpXXP2uBbRlQdsaaV7JqxJh8Go9BOiTUPvBQyE+wp+JZjtfaLfgSTKHB/CGXbokbqO8fVK1c7E7eOq7yMnCy+wlo+6xopcopYPk54ySNuo259h6UjXtG2n2Lo/yPWbPru9umR7U5VvfyYYznHadJ7GhSntWU/ZqjxOV7LhD2rZcBZk7grmOM02mV17A6bX1k85/wDc1+Dhyg+1t7zKM7MjNdlV3UJJcXqaaV/HNz2ONxbQB1D+xS8svIx7H2q1T9cC+OJj5Fa7J6NeuInxDFpa20MTCASL6b36dw2qu7Lsy/wq48CynFrxNbbJcSWUFKIo2RjTmgC+87T33W3TX2dagnyMS+ztbHNrmKlaQBAAgDxAGrwZl75jb9AUOzhrroT7SfLU3KZAEACANT4GO1taTzgKDhGXNElOS5MzY0AWAsOZSSS4Ii23zMl0AQAIAEACABAAgAQAIA1PgYdJa0nnAUHCL5okpyXBMzAtqUktCPMyXQBAHiANQp2A3DW332Cgq4rikS7STWjZuUyIxZS1M8LWyRHkjQ4WB6D+3cs7Psuqip1vh4j+BXTa3CxcfAW4XikdQ0Fp5W1u0H4c6Yx8mF8dYvj0KMjGnTLSS4dReSmRciWU+Iictp4eUS4XI1X2N/clYmfkK5qmvjxNrAx3SndZw4Eno4BHGxg+i0DuC164KEFFeBkWT35uT8TerCBg+MO0EA9IUXFPmjqk1yZ5HE1upoHQAERjFckDlKXNmxSOGL2gixFxzrjSfBgm1yMYomt1ADoFlyMUuSOuTlzZsUjgIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEAa5GAggi4Ogg7lFpNaPkdTaeqI7WZJsJzonlh3HSOw6x6VlXbKjrvVy0NSrakktLFqJzkvO7Q+fk/iPoKr+7LnwlZw+Jatp0rjGHH4IeMJwSKn0i7n7XH9tyfxsKujlxfUQyM2y/nwXQdk4KAgAQAIAEACABAAgD/2Q=="
              style={{ borderRadius: "10px" }}
              width="100"
              height="75"
              alt="Logo"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/expenses_list">
                  All Expense
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add_expenses">
                  Add Expenses
                </NavLink>
              </li>
            </ul>
            

            {/* Right-side links */}
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      <i className="fas fa-user-plus"></i> Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      <i className="fas fa-user"></i> Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;