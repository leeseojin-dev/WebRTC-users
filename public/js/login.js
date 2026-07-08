function sendit() {
    const userid = document.getElementById("userid")
    const userpw = document.getElementById("userpw")

    // console.log(userid, userpw)

    // 아이디를 입력하지 않은 경우
    if(userid.value === "") {
        alert("아이디를 입력하세요")
        userid.focus()
        return false
    }

    // 비밀번호를 입력하지 않은 경우
    if(userpw.value === "") {
        alert("비밀번호를 입력하세요")
        userpw.focus()
        return false
    }
}
