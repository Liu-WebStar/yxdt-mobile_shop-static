import request from "@/utils/request";

export function login(username,password){
  return request({
    url:"xxx.php",
    method:'post',
    data:{username,password}
  });
}