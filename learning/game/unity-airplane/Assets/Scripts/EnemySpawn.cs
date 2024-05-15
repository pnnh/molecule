using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[AddComponentMenu("MyGame/EnemySpawn")]
public class EnemySpawn : MonoBehaviour
{
    public Transform m_enemy;
    protected Transform m_transform;

    void Start()
    {
        m_transform = this.transform;
        StartCoroutine(SpawnEnemy());
    }

    private void OnDrawGizmos()
    {
        Gizmos.DrawIcon(transform.position, "item.png", true);
    }

    IEnumerator SpawnEnemy()
    {
        yield return new WaitForSeconds(Random.Range(5, 15));
        Instantiate(m_enemy, m_transform.position, Quaternion.identity);
        StartCoroutine(SpawnEnemy());
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
