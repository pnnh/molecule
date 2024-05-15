using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[AddComponentMenu("MyGame/Player")]
public class Player : MonoBehaviour
{
    public float m_speed = 1;
    public Transform m_rocket;
    protected Transform m_transform;
    private float m_rocketTimer = 0;
    public float m_life = 3;
    public AudioClip m_shootClip;
    protected AudioSource m_audio;
    public Transform m_explosionFX;
    protected Vector3 m_targetPos;
    public LayerMask m_inputMask;

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Start");
        m_transform = this.transform;
        m_audio = this.GetComponent<AudioSource>();
        m_targetPos = this.m_transform.position;
    }

    void MoveTo()
    {
        if (Input.GetMouseButton(0))
        {
            Vector3 ms = Input.mousePosition;
            Ray ray = Camera.main.ScreenPointToRay(ms);
            RaycastHit hitinfo;
            bool iscast = Physics.Raycast(ray, out hitinfo, 1000, m_inputMask);
            // bool iscast = Physics.Raycast(ray, out hitinfo, 1000, LayerMask.GetMask("plane"));  // 效果和上一句一样
            if (iscast)
            {
                Debug.Log("hitinfo");
                m_targetPos = hitinfo.point;
            }
            Vector3 pos = Vector3.MoveTowards(this.m_transform.position, m_targetPos,
                m_speed * Time.deltaTime);
            this.m_transform.position = pos;
        }
    }

    // Update is called once per frame
    void Update()
    {
        m_rocketTimer -= Time.deltaTime;
        float movev = 0;
        float moveh = 0;

        if (Input.GetKey(KeyCode.UpArrow))
        {
            movev -= m_speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.DownArrow))
        {
            movev += m_speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            moveh += m_speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.RightArrow))
        {
            moveh -= m_speed * Time.deltaTime;
        }
        if (m_rocketTimer <= 0)
        {
            m_rocketTimer = 0.1f;
            if (Input.GetKey(KeyCode.Space) || Input.GetMouseButton(0))
            {
                Instantiate(m_rocket, m_transform.position, m_transform.rotation);
                m_audio.PlayOneShot(m_shootClip);
            }
        }
        m_transform.Translate(new Vector3(moveh, 0, movev));
        MoveTo();
        
    }

    private void OnTriggerEnter(Collider other)
    {
        if(other.tag.CompareTo("PlayerRocket") != 0)
        {
            m_life -= 1;
            GameManager.Instance.ChangeLife((int)m_life);
            if (m_life <= 0)
            {
                Instantiate(m_explosionFX, m_transform.position, Quaternion.identity);
                Destroy(this.gameObject);
            }
        }
    }
}
